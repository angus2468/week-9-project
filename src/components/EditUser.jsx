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
            className="flex flex-col p-3 rounded-xl"
            action={handleUserEdit}
          >
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" required></input>
            <input type="hidden" name="userId" value={userId} />
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" required />
            <button type="submit" onClick={toggleEditForm}>
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
