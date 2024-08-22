import React , {useState , useEffect} from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import axios from 'axios';

//css
import "./NgoPhotos.css";

//utils
import {SERVER_BASE_URL} from "../../../Util/Base_Url";

export default function NgoPhotos() {
    let ngo = JSON.parse(sessionStorage.getItem("ngo"));  
    const  [ngoPhotos, setNgoPhotos] = useState([]);
    const [showImageModal, setshowImageModal] = useState(false);
    const [selectPhoto , setselectPhoto] = useState("");
    const [showAddPhoto , setPhoto] = useState(false);
    const [addPhoto , setAddPhoto] = useState([]);
    const [addPhotosLoadingg , setAddPhotoLoading] = useState(false);
    const [loading , setLoading] = useState(false);

    // fetch all photos
    useEffect(()=>{
        fetchAllPhotos();
    },[])

    const fetchAllPhotos = async()=>{
        setLoading(true);
        try{
            let res = await axios.get(`${SERVER_BASE_URL}/api/ngo/getAllNgoPhotosByNgoId/${ngo._id}`);
            if(res.data.success){
                setNgoPhotos(res.data.data);
                setLoading(false);
            }else{
                toast.error(res.data.message);
                setLoading(false);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        // Initialize Bootstrap modal when component mounts
        const modalElement = document.getElementById('gallery-modal');
        const modal = new window.bootstrap.Modal(modalElement);
        showImageModal ? modal.show() : modal.hide();
    }, [showImageModal]);

    const handleOpenModal = (photo) => {
        setselectPhoto(photo);
        setshowImageModal(true);

    };

    const handleCloseModal = () => {
        setshowImageModal(false);
    };

    const deletePhoto = () => {
        handleCloseModal();
        Swal.fire({
            title: "Do you want to delete this photo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async(result) =>{
            if (result.isConfirmed) {
                

                try{
                    await axios.delete(`${SERVER_BASE_URL}/api/ngo/deleteNgoPhotos/${ngo._id}` ,{data :  {photos : [selectPhoto]}}).then((res) => {
                        if (res.data.success) {
                            toast.success("Photo deleted successfully");
                            setNgoPhotos(ngoPhotos.filter((img , index) => img !== selectPhoto))
                        } else {
                            toast.error(res.data.message);
                        }
                    });
                }catch(error){
                    toast.error(error.message);
                }
            } 
          });
    };

    const handleshowAddPhoto = () => {
        setPhoto(true);
    };

    const handleAddPhoto = async(e)=>{
        e.preventDefault();

        if(addPhoto.length == 0){
            Swal.fire({
                title: "Error!",
                text: "Please Select Photos.",
                icon: "error",
                confirmButtonText: "OK",
              });
              return;
        }
      
        setAddPhotoLoading(true);
        const formData = new FormData();
        for (let i = 0; i < addPhoto.length; i++) {
          formData.append("images", addPhoto[i]);
        }

        try{
          let res =   await axios.post(`${SERVER_BASE_URL}/api/ngo/addNgoPhotos/${ngo._id}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              if(res.data.success){
                setPhoto(false);
                setAddPhoto([]);
                setNgoPhotos([...ngoPhotos,...res.data.data]);
                toast.success("Photo added successfully");
              }else{
                toast.error(res.data.message);
              }
              setAddPhotoLoading(false);
        }catch(error){
            setAddPhotoLoading(false);
           toast.error(error.message);
        }

    }

  return (
    <>
     <section className='container'>
        <h1 className='text-center'>Ngo Photos</h1>

        <div>
            <button className='btn btn-primary' onClick={handleshowAddPhoto}>Add Photos</button>
        </div>

        {/* add photos */}
        {showAddPhoto &&
        <form onSubmit={handleAddPhoto}>
             <input type="file" className='form-control mt-4'
               multiple 
            accept="image/*" 
            onChange={(e)=> e.target.files.length > 0 && setAddPhoto(Array.from(e.target.files))}
             />
            {addPhotosLoadingg ? <button type='button' className='btn btn-primary mt-3'>Loading ...</button> :  <button type='submit' className='btn btn-primary mt-3'>Add Photos</button>}
        </form>
        }

        {/* show photos */}
        <div className='row mt-3'>
            {loading && <p>Loading....</p>}
            {
             !loading &&  ngoPhotos &&  ngoPhotos.map((photo, index)=>{
                    return(
                        <div key={index} onClick={()=> handleOpenModal(photo)} className='col-md-4 col-sm-12 ' >
                            <div className='card m-3 img-hover'>
                                <img src={photo} alt="" className='card-img-top' />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </section>

    {/* <!-- Modal --> */}
        <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                 <div class="btn btn-danger " onClick={deletePhoto} data-bs-dismiss="modal" aria-label="Close"><i className="fas fa-trash"></i></div>
                <button type="button" class="btn-close" onClick={handleCloseModal} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src={selectPhoto} className="img-fluid" alt="modal img" style={{ maxHeight: '80vh', width: '100%', objectFit: 'cover' }}  />
            </div>
            </div>
        </div>
        </div>
    </>
   
  )
}
