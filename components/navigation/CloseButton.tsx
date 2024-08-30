"use client";
import { IconButton, styled } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const CloseIconButton = styled(IconButton)`
    margin: 1rem 2rem 1rem auto;
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
