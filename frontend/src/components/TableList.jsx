import {
  Tbody,
  Tr,
  Td,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";

// passing props
const TableList = ({ animeReviewList, updateReview, deleteReview, setNewReview }) => {
  return (
    <>
      {animeReviewList.map((value) => {
        return (
          <Tbody>
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
    </>
  )
}

export default TableList; 