import type { Word } from '@/entities/word';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

type ProjectWordsListProps = {
  words: Word[];
  isLoading?: boolean;
};

export const ProjectWordsList = ({
  words,
  isLoading = false,
}: ProjectWordsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Words</CardTitle>
        <CardDescription>
          {isLoading ? 'Loading…' : `${words.length} saved word(s)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {words.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No words yet. Use quick save to add one.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>English</TableHead>
                <TableHead>Russian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {words.map((word) => (
                <TableRow key={word.id}>
                  <TableCell className="font-medium">{word.english}</TableCell>
                  <TableCell>{word.russian}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
