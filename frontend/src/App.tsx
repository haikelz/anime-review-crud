import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { submitReview } from "./helpers/submitReview";
import { updateReview } from "./helpers/updateReview";
import { deleteReview } from "./helpers/deleteReview";
import { getData } from "./helpers/getData";

interface ReviewList {
  animeName: string;
  animeReview: string;
}

const animeNameAtom = atom<string>("");
const reviewAtom = atom<string>("");
const newReviewAtom = atom<string>("");
const reviewListAtom = atom<any>([]);

const App = () => {
  const [animeName, setAnimeName] = useAtom(animeNameAtom);
  const [review, setReview] = useAtom(reviewAtom);
  const [newReview, setNewReview] = useAtom(newReviewAtom);
  const [reviewList, setReviewList] = useAtom(reviewListAtom);

  useEffect(() => {
    getData(setReviewList);
  }, []);

  return (
    <Container maxW="container.xl">
      <Flex justify="center" alignItems="center" flexDir="column">
        <Heading>Anime Review</Heading>
        <Input
          mt={4}
          w={64}
          type="text"
          placeholder="Masukkan judul Anime"
          onChange={(event) => setAnimeName(event.target.value)}
        />
        <Textarea
          mt={4}
          mb={3}
          w={96}
          placeholder="Berikan pendapatmu"
          onChange={(event) => setReview(event.target.value)}
        ></Textarea>
        <Button
          type="submit"
          onClick={() =>
            submitReview(animeName, review, reviewList, setReviewList)
          }
          colorScheme="red"
        >
          Submit
        </Button>
        <TableContainer my={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama Film</Th>
                <Th>Review</Th>
                <Th>Opsi</Th>
              </Tr>
            </Thead>
            {reviewList.map((item: ReviewList, index: number) => (
              <Tbody key={index + 1}>
                <Tr>
                  <Td>{item.animeName}</Td>
                  <Td>{item.animeReview}</Td>
                  <Td>
                    <IconButton
                      aria-label="edit review icon"
                      mr={2}
                      onClick={() =>
                        updateReview(item.animeName, newReview, setNewReview)
                      }
                      icon={<RepeatIcon />}
                      colorScheme="blue"
                    />
                    <IconButton
                      aria-label="delete icon"
                      mx={2}
                      onClick={() => deleteReview(item.animeName)}
                      icon={<DeleteIcon />}
                      colorScheme="blue"
                    />
                    <Input
                      placeholder="Ubah Review"
                      ml={2}
                      w={64}
                      type="text"
                      onChange={(event) => setNewReview(event.target.value)}
                    />
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};

export default App;
