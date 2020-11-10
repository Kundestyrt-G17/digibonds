import React from "react";
import { width } from "@material-ui/system";

interface AttendanceBarProps {
  attendance: number;
}

export default function AttendanceBar(props: AttendanceBarProps) {
  const { attendance } = props;

  const width = 314;

  return (
    <svg
      width={width}
      height="51"
      viewBox="0 0 314 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          width={attendance * width}
          y="15"
          height="35"
          fill={attendance > 0.666 ? "#347870" : "#21487D"}
        />
        <text
          x={attendance * width - 40}
          y="40"
          fontFamily="Roboto Condensed"
          fontSize="14px"
          fill={"white"}
        >
          {attendance * 100}%
        </text>
      </g>
      <g opacity="0.2">
        <rect width={width} y="15" height="35" fill="#21487D" />
      </g>
      <polygon
        points={`${width * 0.6666} 15.000,${width * 0.6666 - 2.598} 10.500, ${
          width * 0.6666 + 2.598
        } 10.500`}
        opacity="0.25"
        fill="#0E294F"
      />

      <polygon
        points={"3.000 15.000, 0.402 10.500, 5.598 10.500"}
        opacity="0.25"
        fill="#0E294F"
      />

      <text
        x={width * 0.6666 - 10}
        y={9}
        fill={"#21487D"}
        opacity={0.5}
        fontSize="10px"
        fontFamily="Roboto Condensed"
      >
        66.6%
      </text>
      <text
        x={0}
        y={9}
        fill={"#21487D"}
        opacity={0.5}
        fontSize="10px"
        fontFamily="Roboto Condensed"
      >
        0%
      </text>

      <line
        x1={width * 0.6666}
        y1="15"
        x2={width * 0.6666}
        y2="51"
        stroke="#FEFEFF"
      />
    </svg>
  );
}

function pathToPolyConerter(path) {}
