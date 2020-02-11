import React, { FunctionComponent } from 'react';
import { PageDetailPartition, PageDetailPartitionType, PageDetailPartitionLink, PageDetailPartitionRelation, PageDetailPartitionImage, PageDetailPartitionColor, PageDetailPartitionUnorderedList, PageDetailPartitionOrderedList } from '../../page/entities/PageDetailPartition';
import { Typography, Link, Divider, makeStyles, Box } from '@material-ui/core';
import CastQuoteblock from './CastQuoteblock';

export interface CastPartitionProps {
  partition: PageDetailPartition;
}

const useStyles = makeStyles({
  divider: {
    'margin-top': 20,
    'margin-bottom': 20,
  },
  center: {
    'width': '100%',
    'margin': '0 auto',
    'text-align': 'center',
  },
});

const CastPartition: FunctionComponent<CastPartitionProps> = (props) => {
  const classes = useStyles();

  const unexpectedPartitionClass = ():Error => {
    return new Error(`partition: ${props.partition.type} had wrong class: ${typeof props.partition}`);
  }

  const unexpectedPartitionProperties = ():Error => {
    return new Error(`partition: ${props.partition.type} did not have 'value' or 'partitions' properties when expected`);
  }

  const renderPartitions = () => {
    return (
      <React.Fragment>
        {props.partition.partitions.map((partition, index) => (
          <CastPartition
            key={index}
            partition={partition} />
        ))}
      </React.Fragment>
    )
  }

  const renderPartition = () => {
    switch(props.partition.type) {
      case PageDetailPartitionType.Header1:
        return <Typography variant='h1' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Header2:
        return <Typography variant='h2' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Header3:
        return <Typography variant='h3' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Header4:
        return <Typography variant='h4' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Header5:
        return <Typography variant='h5' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Header6:
        return <Typography variant='h6' gutterBottom>{props.partition.value}</Typography>
      case PageDetailPartitionType.Paragraph:
        if (props.partition.hasValue) {
          return <Typography gutterBottom>{props.partition.value}</Typography>
        }
        if (props.partition.hasPartitions) {
          return <Typography gutterBottom>{renderPartitions()}</Typography>;
        }
        throw unexpectedPartitionProperties();
      case PageDetailPartitionType.Text:
        if (props.partition.hasValue) {
          return props.partition.value;
        }
        if (props.partition.hasPartitions) {
          return renderPartitions();
        }
        throw unexpectedPartitionProperties();
      case PageDetailPartitionType.Bold:
        if (props.partition.hasValue) {
          return <b>{props.partition.value}</b>
        }
        if (props.partition.hasPartitions) {
          return <b>{renderPartitions()}</b>;
        }
        throw unexpectedPartitionProperties();
      case PageDetailPartitionType.Italics:
        if (props.partition.hasValue) {
          return <i>{props.partition.value}</i>
        }
        if (props.partition.hasPartitions) {
          return <i>{renderPartitions()}</i>;
        }
        throw unexpectedPartitionProperties();
      case PageDetailPartitionType.Color:
        if (!(props.partition instanceof PageDetailPartitionColor)) {
          throw unexpectedPartitionClass();
        }
        const colorStyle = {color: props.partition.color};
        return <span style={colorStyle}>{props.partition.value}</span>
      case PageDetailPartitionType.Quoteblock:
        if (props.partition.hasValue) {
          return <CastQuoteblock>{props.partition.value}</CastQuoteblock>
        }
        if (props.partition.hasPartitions) {
          return <CastQuoteblock>{renderPartitions()}</CastQuoteblock>;
        }
        throw unexpectedPartitionProperties();
      case PageDetailPartitionType.UnorderedList:
        if (!(props.partition instanceof PageDetailPartitionUnorderedList)) {
          throw unexpectedPartitionClass();
        }
        return (
          <ul>
            {props.partition.items.map((partition, index) => (
              <li key={index}><CastPartition
                partition={partition} /></li>
            ))}
          </ul>
        );
      case PageDetailPartitionType.OrderedList:
        if (!(props.partition instanceof PageDetailPartitionOrderedList)) {
          throw unexpectedPartitionClass();
        }
        return (
          <ol>
            {props.partition.items.map((partition, index) => (
              <li key={index}><CastPartition
                partition={partition} /></li>
            ))}
          </ol>
        );
      case PageDetailPartitionType.Image:
        if (!(props.partition instanceof PageDetailPartitionImage)) {
          throw unexpectedPartitionClass();
        }
        return (
          <Box className={classes.center}>
            <img src={props.partition.link} alt={props.partition.altText}/>
            <Typography variant="caption" display="block" gutterBottom>{props.partition.altText}</Typography>
          </Box>
        );
      case PageDetailPartitionType.Link:
        if (!(props.partition instanceof PageDetailPartitionLink)) {
          throw unexpectedPartitionClass();
        }
        return <Link href={props.partition.link}>{props.partition.value}</Link>
      case PageDetailPartitionType.Relation:
        if (!(props.partition instanceof PageDetailPartitionRelation)) {
          throw unexpectedPartitionClass();
        }
        return <Link href={props.partition.relation}>{props.partition.value}</Link>
      case PageDetailPartitionType.PageBreak:
        return <Divider className={classes.divider} variant="middle" />
      default:
        throw new Error(`unexpected partition type: ${props.partition.type}`);
    }
  }

  return (
    <React.Fragment>
      {renderPartition()}
    </React.Fragment>
  );
}

export default CastPartition;
