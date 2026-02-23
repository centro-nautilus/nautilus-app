import { RouterProvider } from "react-router"
import { appRoutes } from "./app.routes"
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";



export const App = () => {
    
    return (
        <>
            <Toaster
                position="top-right"
                containerStyle={{
                    top: "120px"
                }}
                toastOptions={{
                    className: 'md:mr-16 text-2xl w-80 h-15'
                }}
            />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={appRoutes} />
            </QueryClientProvider>

        </>
    )
}