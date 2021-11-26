import React from 'react'
import axios from 'axios';
 const uploadProductImage = ({match}) => {
    var baseUrl = "http://165.227.108.19";
    return (
        <div>
              
            <h1>Upload Product Image </h1>
            <input type="file" name="file" id="" onChange={(e)=>{
                console.log(e.target.files[0]);
                var img = e.target.files[0];
                var formdata = new FormData();
                formdata.append("file", img);
                axios
                  .post(`${baseUrl}/profile`, formdata)
                  .then((result) => {
                    console.log(result);
                    // var img = document.createElement("img");
        
                    // img.src = result.data.data.filename;
                    // var src = document.getElementById("x");
                    // src.appendChild(img);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }} />
        </div>
    )
}



export default uploadProductImage;