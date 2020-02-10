import { Page } from "../../entities/Page";

export function getDefaultPages():Page[] {
  return [
    new Page('PG_1', 'Page 1'),
    new Page('PG_2', 'Page 2'),
  ];
}