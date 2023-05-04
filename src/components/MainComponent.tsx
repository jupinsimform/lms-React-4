import { useState, useRef } from "react";
import { DummyData as data } from "../Data/DummyData";
import { Lock, Trash2 } from "react-feather";
import Card from "./Card";
import { User } from "../types/Types";

function MainComponent() {
  const [hoverdata, setHoverData] = useState<User | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLTableElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleHover = (user: User) => {
    setHoverData(user);
    if (cardRef.current) {
      cardRef.current.style.display = "flex";
    }
  };
  const handleMouseLeave = () => {
    setHoverData(null);
    if (cardRef.current) {
      cardRef.current.style.display = "none";
    }
  };

  return (
    <div className="position-relative">
      <table className="user-table">
        <thead>
          <tr>
            <th className="py-3 ps-3 pe-5 text-left text-lg fs-5">Name</th>
            <th className="py-3 ps-3 pe-5 text-left text-lg fs-5">Status</th>
            <th className="py-3 ps-3 pe-5 text-left text-lg fs-5">Access</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, i) => {
            return (
              <tr key={item._id}>
                <td className="py-3 ps-4 pe-3 ">
                  <div
                    className="d-flex flex-start cursor-ponter"
                    onMouseEnter={() => handleHover(item)}
                    onMouseLeave={() => handleMouseLeave()}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="w-10 h-10 me-4">
                      <img
                        className="w-10 h-10 circle"
                        src={item.avatar}
                        alt=""
                      />
                    </div>
                    <div className="user_name">
                      <div>
                        {item.first_name} {item.last_name}
                      </div>
                      <div className="text-gray">{item.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 ps-4 pe-3">
                  {i == 0 ? (
                    <div className="text-green">Active</div>
                  ) : (
                    <select className="status py-2 px-2 text-left">
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Active</option>
                    </select>
                  )}
                </td>
                <td className="py-3 ps-4 pe-3">
                  {i == 0 ? (
                    <div className="text-gray fw-bold">Owner</div>
                  ) : (
                    <select className="access py-2 px-1 text-left">
                      {item.role == "Manager" ? (
                        <option value="Manager">Manager</option>
                      ) : (
                        <option value="Read">Read</option>
                      )}
                    </select>
                  )}
                </td>
                <td className="py-3 ps-4 pe-3">
                  <button className="btn border-0">
                    {i == 0 ? <Lock color="gray" /> : <Trash2 color="gray" />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="ms-2 user"
        ref={cardRef}
        style={{
          maxWidth: "100%",
          ...(window.innerWidth <= 700 && {
            left: `${mousePosition.x - 150}px`,
            top: `${mousePosition.y + 150}px`,
            transition: "all 0.3s ease-in-out",
          }),
        }}
      >
        <Card hoverdata={hoverdata} />
      </div>
    </div>
  );
}

export default MainComponent;
