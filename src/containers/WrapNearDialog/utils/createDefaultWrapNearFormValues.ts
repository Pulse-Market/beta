import { WrapNearFormValues } from "../../../services/NearService";

export default function createDefaultWrapNearFormValues(): WrapNearFormValues {
    return {
        amountIn: '0',
        type: 'wrap',
    };
}
