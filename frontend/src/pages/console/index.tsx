import styled from '@emotion/styled';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLiveSelfStreams } from '~/api/hooks';
import { Schemas } from '~/api/types';
import { NewLiveDialog } from '~/components/console/newlive';

export default function StreamerConsolePage(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const liveStreams = useLiveSelfStreams();

  return (
    <>
      <NewLiveDialog isOpen={open} onClose={() => setOpen(false)} />
      <Stack sx={{ mx: 2, my: 3 }} gap={3}>
        <Container>
          <Typography level="h3">配信一覧</Typography>
          <Stack sx={{ display: 'block', my: 3 }}>
            <Button onClick={() => setOpen(true)}>予約配信を作成</Button> (TODO)
          </Stack>

          <Grid
            container
            spacing={3}
            columns={1}
            flexGrow={1}
            sx={{ padding: 2 }}
          >
            {/* {Array(10)
              .fill(0) */
            liveStreams.data?.map((stream) => (
              <Grid key={stream.id} xs={1}>
                <LiveItem liveSteram={stream} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Stack>
    </>
  );
}

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

interface LiveItemProps {
  liveSteram: Schemas.Livestream;
}
function LiveItem(props: LiveItemProps): React.ReactElement {
  return (
    <Link
      to={`/console/live/${props.liveSteram.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card>
        <Grid container columns={4} spacing={3}>
          <Grid xs={1}>
            <AspectRatio sx={{ borderRadius: 10 }}>
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=400"
                loading="lazy"
              />
            </AspectRatio>
          </Grid>

          <Grid xs={2}>
            <Stack direction="column" spacing={1} sx={{ marginTop: 1 }}>
              <Typography level="title-sm">{props.liveSteram.title}</Typography>
              <Typography level="body-sm" component="div">
                <Stack direction="row" spacing={2}>
                  <span>1234人視聴・12分前</span>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <span>開始 2023-10-10 12:23</span>
                  <span>終了 2023-10-10 12:23</span>
                </Stack>
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ marginTop: 1 }}
            >
              <Avatar />
              <div>
                <Typography level="title-sm">user</Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
