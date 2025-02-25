import { useEffect, useMemo, useState } from "react";
import useGetUsers from "../domain/hooks/useGetUsers";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { User } from "../domain/models/getUser.api.response";

const UserPage = () => {
    const { getUsers, users } = useGetUsers();
    const [search, setSearch] = useState("");

    const columns = useMemo(
        () => [
            {
                accessorFn: (row: any) => `${row.name.first} ${row.name.last}`,
                header: "Usuario",
                cell: (value: any) => {
                    const user: User = value.row.original;

                    return (
                        <div className="flex items-center gap-3">
                            <img src={user.picture.thumbnail}
                                alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                            <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {user.name.first} {user.name.last}
                                </p>
                                <p
                                    className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "location.country", header: "Ubicación", cell: (value: any) => {
                    const user: User = value.row.original;

                    return (
                        <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.location.country}
                            </p>
                            <p
                                className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                {user.location.city}
                            </p>
                        </div>
                    );
                },
            },
            {
                accessorKey: "gender", header: "Sexo", cell: (value: any) => {
                    const user: User = value.row.original;

                    return (
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.gender}
                        </p>
                    );
                },
            },
            {
                accessorKey: "dob.age", header: "Edad", cell: (value: any) => {
                    const user: User = value.row.original;

                    return (
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {user.dob.age}
                        </p>
                    );
                },
            },
        ],
        []
    );

    useEffect(() => {
        getUsers();
    }, []);

    const table = useReactTable({
        data: users?.results || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter: search },
        onGlobalFilterChange: setSearch,
    });

    return (
        <div className="w-full h-full">
            <div className="relative flex flex-col w-full h-full min-w-7xl text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between gap-8 mb-8">
                        <div>
                            <h5
                                className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Usuarios
                            </h5>
                            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                Lista de usuarios disponibles en el sistema
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="p-4 bg-blue-gray-50/50 border-y border-blue-gray-100"
                                        >
                                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </p>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row, index) => {
                                    const isLast =
                                        index ===
                                        table.getRowModel().rows.length - 1;
                                    const className = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className={className}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                                No hay resultados
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {`Pagina ${table.getState().pagination.pageIndex + 1} de ${Math.ceil(1000 / 10)}`}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            className="select-none rounded-lg border border-[#1722FF] bg-[#FFD117] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-[#1722FF] transition-all hover:bg-white hover:text-[#1722FF] focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Atras
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            className="select-none rounded-lg border border-[#1722FF] bg-[#FFD117] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-[#1722FF] transition-all hover:bg-white hover:text-[#1722FF] focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
