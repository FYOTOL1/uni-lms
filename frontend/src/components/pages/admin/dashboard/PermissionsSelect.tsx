import type { TPermissions } from "../../../../types/schema/UserSchemaType";

type Props = {
  name:
    | "users"
    | "subjects"
    | "calendars"
    | "assignments"
    | "lectures"
    | "sections";
  permissions: TPermissions;
  setFieldValue: (name: string, value: boolean) => void;
};

const PermissionsSelect = ({ name, permissions, setFieldValue }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between p-2 bg-gray-200 rounded outline outline-gray-300 shadow-sm w-full">
        <h1 className="capitalize text-lg font-bold">{name}</h1>
        <div className="flex items-center gap-2 uppercase">
          <button
            type="button"
            onClick={() =>
              setFieldValue(
                `permissions.${name}.canCreate`,
                !permissions[name].canCreate,
              )
            }
            className={`flex items-center gap-1 py-0.5 px-2 rounded text-white ${permissions[name]?.canCreate ? "bg-green-500 hover:bg-green-600" : "bg-red-400 hover:bg-red-500"} transition-all cursor-pointer`}
          >
            <p>Create</p>
          </button>
          <button
            type="button"
            onClick={() =>
              setFieldValue(
                `permissions.${name}.canEdit`,
                !permissions[name].canEdit,
              )
            }
            className={`flex items-center gap-1 py-0.5 px-2 rounded text-white ${permissions[name]?.canEdit ? "bg-green-500 hover:bg-green-600" : "bg-red-400 hover:bg-red-500"} transition-all cursor-pointer`}
          >
            <p>Edit</p>
          </button>
          <button
            type="button"
            onClick={() =>
              setFieldValue(
                `permissions.${name}.canDelete`,
                !permissions[name].canDelete,
              )
            }
            className={`flex items-center gap-1 py-0.5 px-2 rounded text-white ${permissions[name]?.canDelete ? "bg-green-500 hover:bg-green-600" : "bg-red-400 hover:bg-red-500"} transition-all cursor-pointer`}
          >
            <p>Delete</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default PermissionsSelect;
