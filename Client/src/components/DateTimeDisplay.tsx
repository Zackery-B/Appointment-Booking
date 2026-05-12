type DateTimeProps = {
    datetime: string;
};

export default function DateTimeDisplay({datetime}:DateTimeProps) {
    return(
        <p>
            {new Date(datetime).toLocaleString()}
        </p>
    )
}