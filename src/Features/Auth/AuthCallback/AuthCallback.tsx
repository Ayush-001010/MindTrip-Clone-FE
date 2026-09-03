import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            navigate("/auth/signin", { replace: true });
            return;
        }

        localStorage.setItem("token", token);

        navigate("/", { replace: true });
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eefafa]">
            <div className="text-center">
                <p className="text-lg font-medium text-gray-700">
                    Signing you in...
                </p>
            </div>
        </div>
    );
};

export default AuthCallback;