import { getOracleConfig } from "../../services/OracleService";
import { setOracleConfig, setOracleErrors, setOracleLoading } from "./oracle";

export function loadOracleConfig() {
    return async (dispatch: Function) => {
        try {
            dispatch(setOracleLoading(true));

            const config = await getOracleConfig();

            dispatch(setOracleConfig(config));
            dispatch(setOracleLoading(false));
        } catch(error) {
            console.error('[loadOracleConfig]', error);
            dispatch(setOracleErrors(error));
            dispatch(setOracleLoading(false));
        }
    }
}



