import { Alert } from "react-native";

export default function showAlert(title,_function,_params) {
    return Alert.alert(
        `${title}`,
        "Tem certeza que deseja excluir?",
        [
            {
                text: "Não",
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: () => _function(_params),
                style: "ok",
            },
        ]
    )
}