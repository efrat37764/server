import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const url = 'mongodb+srv://ranibodi_db_user:Hbe5A7yBLyytxP2j@cluster0.etkqcz6.mongodb.net/?appName=Cluster0';
        await connect(url);
        console.log('mongo connected succesfully');
    } 
    catch (error) {
        console.log(error);
        exit(1);
    }
};