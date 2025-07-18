import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <div>
      <Card.Root>
        <Skeleton height="270px" />
        <Card.Body>
          <SkeletonText />
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default GameCardSkeleton;
