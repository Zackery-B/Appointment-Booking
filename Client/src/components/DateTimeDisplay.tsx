type DateTimeProps = {
    datetime: string;
};

const formatterDate = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

const formatterTime = new Intl.DateTimeFormat("en-CA", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

export default function DateTimeDisplay({datetime}:DateTimeProps) {

    const date = new Date(datetime.replace(" ", "T")) // better safari support
    
    return(
        <div className="DateTimeDisplay">
            <span>{`${formatterDate.format(date)} `}</span>
            <span>{`at ${formatterTime.format(date)}`}</span>
        </div>
    )
}