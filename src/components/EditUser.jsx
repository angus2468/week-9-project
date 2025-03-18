"use client";
import { useState } from "react";
import { handleUserEdit } from "@/app/util";
export default function EditUser({ userId }) {
  const [showModal, setShowModal] = useState(false);

  async function toggleEditForm() {
    setShowModal(!showModal);
  }

  return (
    <>
      <button
        className=" self-center "
        onClick={() => {
          toggleEditForm();
        }}
      >
        Edit
      </button>
      <div>
        {showModal ? (
          <form
            className="flex flex-col items-end gap-2"
            action={handleUserEdit}
          >
            <div>
              <label htmlFor="username">Username:</label>
              <input
                className="bg-gray-600"
                id="username"
                name="username"
                required
              ></input>
            </div>
            <input type="hidden" name="userId" value={userId} />
            <div>
              <label htmlFor="bio">Bio:</label>
              <input className="bg-gray-600" id="bio" name="bio" required />
            </div>
            <button className="" type="submit">
              Confirm
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
