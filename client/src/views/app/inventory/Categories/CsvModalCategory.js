import React from 'react';
import CustomInput from 'reactstrap/lib/CustomInput';


function CsvModalCategory({setData, importing}) {

 

  // handle file upload
  const handleChange = e => {
    const file = e.target.files[0];
    console.log(file);
    var formdata = new FormData();
    formdata.append("categorycsv",file);
   
    setData(formdata);
  }

  return (
    
    <div>
      <CustomInput
        type="file"
        accept=".csv"
        onChange={handleChange}
        id="exampleCustomFileBrowser3"
        name="customFile"
    />
    {importing && 
      <div className='text-center mt-3'>
          <h3>Importing Data !!!</h3>
          <h4>Please Wait...</h4>
      </div>
    }
    </div>
  );
}

export default CsvModalCategory;
