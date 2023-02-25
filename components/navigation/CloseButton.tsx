import { IconButton, styled } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const CloseIconButton = styled(IconButton)`
  margin: 1rem;
`;

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps): JSX.Element => {
  return (
    <CloseIconButton onClick={onClick}>
      <CloseOutlined />
    </CloseIconButton>
  );
};
