import {
  Thead,
  Tr,
  Th,
  TableContainer,
  Text,
  Input,
  Table,
  Textarea,
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import TableList from "../components/TableList";

const AnimeReview = () => {
  const [animeName, setAnimeName] = useState("");
  const [review, setReview] = useState("");
  const [newReview, setNewReview] = useState("");
  const [animeReviewList, setAnimeList] = useState([]);

  const api = "http://localhost:5000/api";

  useEffect(() => {
    axios.get(`${api}/get`).then((response) => {
      setAnimeList(response.data);
    });
  }, []);

  // add data
  const submitReview = () => {
    axios.post(`${api}/insert`, {
      animeName: animeName,
      animeReview: review,
    });
    setAnimeList([
      ...animeReviewList,
      { animeName: animeName, animeReview: review },
    ]);
  };

  // delete data
  const deleteReview = (anime) => {
    axios.delete(`${api}/delete/${anime}`);
  };

  // update data
  const updateReview = (anime) => {
    axios.put(`${api}/update`, {
      animeName: anime,
      animeReview: newReview,
    });
    setNewReview("");
  };

  return (
    <VStack>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Anime Review
        </Text>

        <Input
          mt={4}
          width={64}
          type={"text"}
          placeholder={"Masukkan judul Anime"}
          onChange={(e) => {
            setAnimeName(e.target.value);
          }}
        />

        <Textarea
          mt={4}
          mb={3}
          width={96}
          placeholder={"Berikan pendapatmu"}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></Textarea>
        <Button onClick={submitReview} colorScheme={"red"}>Submit</Button>

        <TableContainer my={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama Film</Th>
                <Th>Review</Th>
                <Th>Opsi</Th>
              </Tr>
            </Thead>

            <TableList
              animeReviewList={animeReviewList}
              updateReview={updateReview}
              deleteReview={deleteReview}
              submitReview={submitReview}
              setNewReview={setNewReview}
            />
          </Table>
        </TableContainer>
      </Flex>
    </VStack>
  );
};

export default AnimeReview;