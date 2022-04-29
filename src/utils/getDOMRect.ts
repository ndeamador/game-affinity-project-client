

const getDOMRect = (ref: React.MutableRefObject<HTMLElement | null>): DOMRect | undefined => {
  return ref.current?.getBoundingClientRect();
}

export default getDOMRect;