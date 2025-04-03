import Skeleton from "react-loading-skeleton";
export default function SkeletonComponent(props) {
  const skeletonLength = Array.from({ length: props.length }).map((_, key) => (
    <div className={props.classes}>
      <div className="mx-1">
        <Skeleton
          baseColor={props.baseColor}
          height={props.height}
          width={props.width}
        />
      </div>
    </div>
  ));

  return skeletonLength;
}
