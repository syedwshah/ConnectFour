export enum ChipColors {
  RED = 'red',
  YELLOW = 'yellow',
}

interface Props {
  color?: ChipColors
}

export const Chip = (props: Props): JSX.Element => (
  <div
    id="chip"
    style={{
      display: 'flex',
      height: 64,
      width: 64,
      zIndex: 20,
      backgroundColor: props.color ?? '#fafafa',
      borderRadius: '50%',
    }}
  />
)
