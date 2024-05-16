import { useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar'

export default function App() {

  const [formData, setFormData] = useState({'q1':0, 'q2':0, 'q3':0, 'q4':0, 'q5':0, 'q6':0, 'q7':0, 'q8':0, 'q9':0, 'q10':0, 'q11':0, 'q12':0, 'q13':0, 'q14':0, 'q15':0, 'q16':0, 'q17':0, 'q18':0, 'q19':0, 'q20':0, 'q21':0, 'q22':0, 'q23':0, 'q24':0, 'q25':0, 'q26':0, 'q27':0, 'q28':0, 'q29':0, 'q30':0, 'q31':0, 'q32':0, 'q33':0, 'q34':0});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process form data and create an array
    const dataArray = [];
    for (let i = 1; i <= 34; i++) {
        dataArray.push(formData[`q${i}`]);
    }
    // You can add more form data to the array as needed
    
    // Send the array to the server
    axios.post('http://localhost:3000/predict', { data: dataArray })
      .then(response => {
        // Handle response from server if needed
        console.log(response.data);
      })
      .catch(error => {
        // Handle error if request fails
        console.error('Error:', error);
      });
  };
  return (<>
      {/* <Navbar /> */}
      <form onSubmit={handleSubmit}>
      <label>
        Input 1:
        <input type="text" name="q1" value={formData.q1} onChange={handleChange} />
      </label>
      <label>
        Input 2:
        <input type="text" name="q2" value={formData.q2} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}