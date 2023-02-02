import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="fit-content" h="fit-content" maxH="none" maxW="none">
        <ModalBody padding="0">
          <Image maxH={900} maxW={600} src={imgUrl} />
        </ModalBody>
        <ModalFooter paddingX={2.5} padding={2} bgColor="pGray.800" justifyContent="left">
          <Link href={imgUrl} target='_blank'>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
