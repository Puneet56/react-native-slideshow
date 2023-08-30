import { StyleSheet, Text, View } from "react-native";

const App = () => {
	return (
		<View styles={styles.container}>
			<Text
				style={{
					margin: 4,
					padding: 4,
				}}
			>
				App
			</Text>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
});
