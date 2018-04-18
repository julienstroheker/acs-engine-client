import hljs from "highlight.js";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { IClusterDefinition } from "../types";

/**
 * @see https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md
 */
export interface IACSClusterDefinitionForm {
  clusterDefinition: IClusterDefinition;
  update: (keyPath: string[], value: any) => Promise<any>;
}

export const ACSClusterDefinitionFormJSON = (clusterDefinition: IClusterDefinition) => {
  return (
    <div className="JSON">
      <h3>JSON</h3>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight("json", JSON.stringify(clusterDefinition, null, 2)).value,
          }}
        />
      </pre>
    </div>
  );
};

export const ACSClusterDefinitionForm = (props: IACSClusterDefinitionForm) => {
  const { clusterDefinition, update } = props;
  const { apiVersion, properties } = clusterDefinition;

  return (
    <div className="ACSClusterDefinitionForm">
      <h3>Cluster Definition</h3>
      <FormGroup>
        <Label for="apiVersion">apiVersion</Label>
        <Input
          disabled
          type="text"
          name="apiVersion"
          id="apiVersion"
          value={apiVersion}
          onChange={e => update(["apiVersion"], e.target.value)}
        />
      </FormGroup>
      <h4>Properties</h4>
      {Object.keys(properties).map(key => {
        const value = properties[key];
        return (
          <div className={`ACSClusterDefinitionForm__${key}`} key={key}>
            <Label for={key}>{key}</Label>
            {generateFormGroup(value, ["properties", key], update)}
          </div>
        );
      })}
    </div>
  );
};

const generateFormGroup = (
  formGroup: any,
  keyPath: string[],
  updateProperty: (path: string[], value: any) => any,
): JSX.Element[] => {
  if (typeof formGroup === "undefined") {
    return [<div className="undefined" />];
  }
  const marginLeft = `${keyPath.length * 0.5}em`;

  return Object.keys(formGroup).map(key => {
    const value = (formGroup as any)[key];

    if (typeof value === "string") {
      return (
        <FormGroup style={{ marginLeft }} key={key}>
          <Label for={key}>{key}:</Label>
          <Input
            bsSize="sm"
            type="text"
            name={key}
            id={key}
            value={value}
            onChange={e => updateProperty([...keyPath, key], e.target.value)}
          />
        </FormGroup>
      );
    } else if (typeof value === "number") {
      return (
        <FormGroup style={{ marginLeft }} key={key}>
          <Label for={key}>{key}:</Label>
          <Input
            bsSize="sm"
            type="number"
            name={key}
            id={key}
            value={value}
            onChange={e => updateProperty([...keyPath, key], Number.parseInt(e.target.value))}
          />
        </FormGroup>
      );
    } else if (Array.isArray(value)) {
      return (
        <FormGroup style={{ marginLeft }} key={key}>
          <Label for={key}>{key}:</Label>
          {value.map((val, index) =>
            generateFormGroup(val, [...keyPath, key, index.toString()], updateProperty),
          )}
        </FormGroup>
      );
    } else if (typeof value === "object") {
      return (
        <FormGroup style={{ marginLeft }} key={key}>
          <Label for={key}>{key}:</Label>
          {generateFormGroup(value, [...keyPath, key], updateProperty)}
        </FormGroup>
      );
    }

    return <div className="not-found">Type for {value} not found</div>;
  });
};
