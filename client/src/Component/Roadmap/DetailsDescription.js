
import { useEffect, useState } from "react";
const url = process.env.REACT_APP_API_URL;




const fetchData = async (current, destination, role) => {
    try {
        const response = await fetch(`${url}/roadmap/details?from=${current}&to=${destination}&details=${role}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received Response:", data);
        return data.response || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const DetailsDescription = ({ current, destination, role }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!current || !destination || !role) {
            return;
        }
        setLoading(true);
        setError(null);

        fetchData(current, destination, role)
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((fetchError) => {
                setError(fetchError.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [current, destination, role]);

    return { data, loading, error };
};

export default DetailsDescription;