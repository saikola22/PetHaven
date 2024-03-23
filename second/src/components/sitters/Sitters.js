import { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import { useNavigate, Outlet } from 'react-router-dom'

function Sitters() {

  const [sitterList, setSitterList] = useState([]);
  let navigate = useNavigate()

  const getSitters = async () => {
    let res = await axiosWithToken.get('http://localhost:4000/sitter-api/sitters')
    console.log(res)
    setSitterList(res.data.payload)
  }


  const readSitterById = (sitterObj) => {
    navigate(`/sitter/${sitterObj.sittername}`, { state: sitterObj })
  }


  useEffect(() => {
    getSitters()
  }, [])



  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-5">
        {sitterList.map((sitter) => (
          <div className="col m-2" key={sitter.sitterId}>
            <div className="shadow h-100 p-3 rounded rounded-3">
              <div className="body">
                <img src={sitter.Photo} alt="" />
                <h5 className="title fs-3 text-success">{sitter.sittername}</h5>
                <p className="card-text fs-2">
                  {sitter.loacation}
                </p>
                <p className="card-text">
                  {sitter.discription.substring(0, 80) + "...."}
                </p>
                <button className="btn btn-success" onClick={() => readSitterById(sitter)}>
                  <span>Read More</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Sitters