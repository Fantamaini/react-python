import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		titre: "",
		date: "",
		heure: "",
		lieu: "",
		description: "",
	
	});
	const toast = useToast();

	const handleCreateUser = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Event created successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
			setUsers((prevUsers) => [...prevUsers, data]);

			setInputs({
				titre: "",
				date: "",
				heure: "",
				lieu: "",
				description: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleCreateUser}>
					<ModalContent>
						<ModalHeader> add an event </ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								{/* Left */}
								<FormControl>
									<FormLabel>Event Name</FormLabel>
									<Input
										placeholder='event name'
										value={inputs.name}
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
									/>
								</FormControl>

								{/* Right */}
								<FormControl>
									<FormLabel>date</FormLabel>
									<Input
										placeholder='18/05/2024'
										value={inputs.date}
										onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>heure</FormLabel>
									<Input
										placeholder='15:45'
										value={inputs.heure}
										onChange={(e) => setInputs({ ...inputs, heure: e.target.value })}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>lieu</FormLabel>
									<Input
										placeholder='paris 15'
										value={inputs.lieu
										}
										onChange={(e) => setInputs({ ...inputs, heure: e.target.value })}
									/>
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="it's about..."
									value={inputs.description}
									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
								/>
							</FormControl>

							<RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio
										value='male'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Male
									</Radio>
									<Radio
										value='female'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Female
									</Radio>
								</Flex>
							</RadioGroup>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};
export default CreateUserModal;
