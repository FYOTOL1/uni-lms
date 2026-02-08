import { useEffect, useState } from "react";
import type { TUserSchemaType } from "../../../../types/schema/UserSchemaType";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import Select from "../../user/shared/Select";
import EditUserPopup from "./EditUserPopup";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { deleteUser } from "../../../../store/slices/UserSlice";
import toast from "react-hot-toast";

type Role = "admin" | "subadmin" | "student";

const UsersTable = ({
  user,
  users,
  refetch,
}: {
  user: TMeRequest;
  users: TUserSchemaType[];
  refetch: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [searchedUsers, setSearchedUsers] = useState<TUserSchemaType[]>(users);
  const [selectedUserToEdit, setSelectedUserToEdit] =
    useState<TUserSchemaType | null>();
  const [selectedSort, setSelectedSort] = useState("");
  const [renderLimit, setRenderLimit] = useState(10);

  const roleOrder: Record<Role, number> = {
    admin: 3,
    subadmin: 2,
    student: 1,
  };

  const sortKey =
    selectedSort === "name"
      ? "userName"
      : selectedSort === "code"
        ? "userCode"
        : selectedSort === "group"
          ? "userGroup"
          : "role";

  const sortHandler = (users: TUserSchemaType[]): TUserSchemaType[] => {
    return users.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (selectedSort == "role") {
        return roleOrder[bValue as Role] - roleOrder[aValue as Role];
      }

      if (sortKey == "userName") {
        return String(aValue).localeCompare(String(bValue));
      }

      if (sortKey == "userGroup") {
        return String(aValue).localeCompare(String(bValue));
      }

      if (typeof aValue == "number" && typeof bValue === "number") {
        return aValue - bValue;
      }

      return String(bValue).localeCompare(String(aValue));
    });
  };

  const searchHandler = (value: string) => {
    if (selectedSort == "code" || selectedSort !== "name") {
      const filteredUsers = users.filter((f) =>
        f.userCode.toString().includes(value),
      );
      setSearchedUsers(filteredUsers);
      return;
    }
    if (selectedSort == "name") {
      const filteredUsers = users.filter((f) =>
        f.userName.toString().includes(value),
      );
      setSearchedUsers(filteredUsers);
      return;
    }

    setSearchedUsers(users);
  };

  const deleteHandler = (e: TUserSchemaType) => {
    if (e.role != "admin") {
      if (e.permissions.users.canDelete) {
        dispatch(deleteUser(e._id));
        refetch();
      } else {
        toast.caller("You Don't Have Permissions");
      }
    }
  };

  useEffect(() => {
    setSearchedUsers(users);
  }, [users]);

  return (
    users && (
      <>
        <div className="bg-white rounded-md shadow-sm w-full mt-4">
          {/* Edit User */}
          {selectedUserToEdit && (
            <>
              <div className="absolute top-0 bottom-0 left-0 right-0 z-30 bg-black opacity-40">
                s
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 z-40">
                <EditUserPopup
                  user={selectedUserToEdit}
                  setSelectedUserToEdit={setSelectedUserToEdit}
                  refetch={refetch}
                />
              </div>
            </>
          )}

          {/* Header */}
          <div className="flex items-center flex-col md:flex-row justify-between py-3 px-4">
            <h1 className="text-xl font-semibold text-zinc-800">Users</h1>
            <div className="flex items-center gap-2">
              {/* Sorting */}
              <Select
                defaultValue="sort by"
                value={selectedSort}
                setSelectedValue={setSelectedSort}
                choiceList={["name", "code", "group", "role"]}
              />

              {/* Search */}
              <div className="relative ps-10 px-2 min-w-32 rounded shadow-sm outline outline-zinc-200">
                <i className="absolute left-2 top-1/2 -translate-y-[calc(50%-1px)] text-lg text-gray-600 fa-solid fa-magnifying-glass" />
                <input
                  onChange={(e) => searchHandler(e.target.value)}
                  className="border-none outline-none py-2"
                  type="text"
                  placeholder={`Search ${selectedSort == "name" || selectedSort == "code" ? selectedSort : "code"}...`}
                />
              </div>

              {/* Add User */}
              {user?.role == "admin" && (
                <button className="flex items-center gap-1.5 px-2 py-2 text-white rounded-md bg-linear-150 from-blue-600 to-blue-500 cursor-pointer transition-all hover:opacity-95">
                  <i className="fa-solid fa-plus"></i>
                  <p>Add New User</p>
                </button>
              )}
            </div>
          </div>

          {/* Users table */}
          <table className="w-full">
            <thead className="border-b border-gray-300">
              <tr className="px-4">
                <th className="py-3 bg-gray-100">name</th>
                <th className="py-3 bg-gray-100">code</th>
                <th className="py-3 bg-gray-100">group</th>
                <th className="py-3 bg-gray-100">year</th>
                <th className="py-3 bg-gray-100">role</th>
                <th className="py-3 bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchedUsers &&
                sortHandler(searchedUsers?.slice(0, renderLimit)).map((e) => (
                  <tr
                    key={e._id}
                    className="text-center px-4 border-b border-gray-300 capitalize"
                  >
                    <td className="py-2 bg-zinc-50">{e.userName}</td>
                    <td className="py-2 bg-zinc-50">{e.userCode}</td>
                    <td className="py-2 bg-zinc-50">{e.userGroup}</td>
                    <td className="py-2 bg-zinc-50">{e.year}</td>
                    <td
                      className={`py-2 bg-zinc-50 font-bold ${e.role == "admin" ? "text-red-400" : e.role == "subadmin" ? "text-purple-500" : "text-gray-700"}`}
                    >
                      {e.role}
                    </td>
                    <td className="flex items-center justify-center gap-2 py-2 bg-zinc-50">
                      {/* Update */}
                      <button
                        onClick={() => setSelectedUserToEdit(e)}
                        className="p-1 text-sm rounded-md bg-blue-400 text-white cursor-pointer transition-all hover:bg-blue-500"
                      >
                        <i className="fa-solid fa-pen" />
                      </button>

                      {/* Delete */}
                      <button
                        disabled={e.role == "admin"}
                        onClick={() => {
                          deleteHandler(e);
                        }}
                        className="p-1 text-sm rounded-md bg-red-400 text-white cursor-pointer transition-all hover:bg-red-500"
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}

              {users.length > renderLimit && (
                <tr className="text-center px-4 border-b border-blue-300 capitalize">
                  <td className="py-1 bg-gray-50"></td>
                  <td className="py-1 bg-gray-50"></td>
                  <td className="py-1 bg-gray-50">
                    <button
                      onClick={() => setRenderLimit(renderLimit + 20)}
                      className="text-sm transition-all cursor-pointer hover:text-blue-800"
                    >
                      <p>Show More...</p>
                    </button>
                  </td>
                  <td className="py-1 bg-gray-50"></td>
                  <td className="py-1 bg-gray-50"></td>
                  <td className="py-1 bg-gray-50"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    )
  );
};

export default UsersTable;
