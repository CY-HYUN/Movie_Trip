import { ResponsiveRadialBar } from "@nivo/radial-bar";

export default function RadialBarChart({
  data,
  isMap = false,
}: {
  data: any;
  isMap?: boolean;
}) {
  return (
    <ResponsiveRadialBar
      data={data}
      maxValue={100}
      endAngle={360}
      innerRadius={isMap ? 0.7 : 0.15}
      padding={0.2}
      cornerRadius={45}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors={{ scheme: "pastel1" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      enableTracks={false}
      enableRadialGrid={false}
      enableCircularGrid={false}
      radialAxisStart={null}
      circularAxisOuter={null}
      labelsTextColor={{ theme: "labels.text.fill" }}
      legends={[]}
    />
  );
}
