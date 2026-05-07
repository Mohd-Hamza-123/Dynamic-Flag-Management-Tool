import { useEffect, useRef, useState } from "react"

export const useMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loadingRef = useRef(false);

    const mutate = async <T>({
        path,
        data,
        mode = "POST"
    }: {
        path: string,
        data?: any,
        mode?: "POST" | "PUT" | "PATCH" | "DELETE"
    }): Promise<{ success: boolean, result: T | null }> => {

        if (loadingRef.current) {
            setError("Please wait!");
            return { success: false, result: null };
        }

        loadingRef.current = true;
        setError("");
        setLoading(true);

        try {
            const response = await fetch(path, {
                body: data ? JSON.stringify(data) : data,
                method: mode,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            return { success: true, result };

        } catch (e: any) {
            setError(e.message);
            return { success: false, result: null };

        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    return { loading, error, mutate };
};

export const useQuery = <T>(path: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<T>();
    const loadingRef = useRef(false);

    const queryFn = async () => {
        if (loadingRef.current) return;
        try {
            loadingRef.current = true;
            setLoading(true);
            const res = await fetch(path);

            if (res.ok) {
                setData(await res.json());
            } else {
                setError(res.statusText || "Something went wrong.")
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }

    useEffect(() => {
        queryFn();
    }, [])


    return { loading, error, data, queryFn };
};