import * as dateFns from 'date-fns';

export default function Date({ dateString }: { dateString: string }) {
  const date = dateFns.parseISO(dateString);
  return (
    <time dateTime={dateString}>{dateFns.format(date, 'LLLL d, yyyy')}</time>
  );
}
