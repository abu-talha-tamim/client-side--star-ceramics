import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxious";
import { FaUser, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("Fetching users...");
      const res = await axiosSecure.get("/users");
      console.log("Users fetched:", res.data);
      return res.data;
    },
    
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => {
      console.log("Deleting user:", id);
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      Swal.fire("Deleted!", "User has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete user.", "error");
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser.mutate(id);
      }
    });
  };

  if (isLoading) {
    console.log("Loading users...");
    return <p className="text-center text-xl">Loading...</p>;
  }
  if (isError) {
    console.error("Error fetching users");
    return <p className="text-center text-red-500">Failed to load users.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>

                <td className="py-2 px-4 text-center">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition mr-2"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
