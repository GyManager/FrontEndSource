import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material/";
import { useFilePicker } from "use-file-picker";

export default function GenericImagePicker(props) {
    let [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: "DataURL",
        accept: "images*",
        multiple: false,
    });

    const [starting, setStarting] = useState(() => true);

    useEffect(() => {
        if (starting) {
            setStarting(false);
        } else {
            const dataIMG = { ...filesContent[0] }.content;
            props.handlePick(dataIMG);
        }
    }, [filesContent, loading]);

    const handleChargeFile = () => {
        openFileSelector();
        if (loading) {
            return <div>Loading...</div>;
        }
    };

    return (
        <Button
            id={"ButtonAddPhotoTest" + props.index}
            onClick={handleChargeFile}
            variant="contained"
            size="small"
            endIcon={<AddAPhoto />}
        >
            Cambiar foto de perfil
        </Button>
    );
}
