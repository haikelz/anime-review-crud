import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Input,
  Table,
  Textarea,
  Flex,
  Button,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const AnimeReview = () => {
  const [animeName, setAnimeName] = useState("");
  const [review, setReview] = useState("");
  const [newReview, setNewReview] = useState("");
  const [animeReviewList, setAnimeList] = useState([]);

  const api = "http://localhost:3001/api";

  useEffect(() => {
    axios.get(`${api}/get`).then((response) => {
      setAnimeList(response.data);
    });
  }, []);

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

  const deleteReview = (anime) => {
    axios.delete(`${api}/delete/${anime}`);
  };

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

            {animeReviewList.map((value) => {
              return (
                <Tbody key={1}>
                  <Tr>
                    <Td>{value.animeName}</Td>
                    <Td>{value.animeReview}</Td>
                    <Td>
                      <IconButton
                        mr={2}
                        onClick={() => {
                          updateReview(value.animeName);
                        }}
                        icon={<RepeatIcon />}
                        colorScheme={"blue"}
                      />

                      <IconButton
                        mx={2}
                        onClick={() => {
                          deleteReview(value.animeName);
                        }}
                        icon={<DeleteIcon />}
                        colorScheme={"blue"}
                      />

                      <Input
                        placeholder={"Ubah Review"}
                        ml={2}
                        width={64}
                        type={"text"}
                        onChange={(e) => {
                          setNewReview(e.target.value);
                        }}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </TableContainer>
      </Flex>
    </VStack>
  );
};

export default AnimeReview;