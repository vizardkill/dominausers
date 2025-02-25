import { useState } from "react";
import { UsersRepository } from "../../repository/users.repository";
import { UserAPIResponse } from "../models/getUser.api.response";
import toast from "react-hot-toast";

const userRepository = new UsersRepository();

const useGetUsers = () => {
    const [users, setUsers] = useState<UserAPIResponse | null>(null);

    const getUsers = async () => {
        try {
            const response = await userRepository.getUsers();
            setUsers(response);
            toast.success("Usuarios obtenidos correctamente", {className: "text-base"});
        } catch (error) {
            toast.error("Error al obtener los usuarios", {className: "text-base"});
        }
    };

    return {
        users,
        getUsers,
    };
};

export default useGetUsers;