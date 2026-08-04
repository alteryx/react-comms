/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';

import UiSdkContext from '../Context/index.tsx';
import * as callback from '../Utils/callback.ts';

import DesignerApi from './index.tsx';

const FooChild = () => {
  const context = useContext(UiSdkContext);
  if (!context) return null;

  const [model, handleUpdateModel] = context;
  if (model.Annotation !== 'foo') {
    handleUpdateModel({ ...model, Annotation: 'foo' });
  }
  return <div data-testid="child">{model.Annotation}</div>;
};

const Child = () => {
  const context = useContext(UiSdkContext);
  if (!context) return null;

  const [model] = context;
  return <div data-testid="child">{model.Annotation}</div>;
};

describe('DesignerApi', () => {
  beforeAll(() => {
    window.Alteryx = {
      AlteryxLanguageCode: 'en',
      Gui: {
        SetConfiguration: jest.fn(),
        GetConfiguration: jest.fn()
      },
      JsEvent: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Child component and update model.Annotation to "foo"', () => {
    render(
      <DesignerApi ctx={window.Alteryx} messages={{}}>
        <FooChild />
      </DesignerApi>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('foo');
  });

  it('should render with a defaultConfig', () => {
    render(
      <DesignerApi ctx={window.Alteryx} defaultConfig={{ Annotation: 'foo' }} messages={{}}>
        <Child />
      </DesignerApi>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('foo');
  });

  it('should provide context with model and update function', () => {
    let contextValue: any;

    const Child = () => {
      contextValue = React.useContext(UiSdkContext);
      return <div data-testid="child">{contextValue[0].Annotation}</div>;
    };

    render(
      <DesignerApi ctx={window.Alteryx} messages={{}}>
        <Child />
      </DesignerApi>
    );

    expect(contextValue).toHaveLength(2);
    expect(contextValue[0]).toMatchObject({
      ToolName: '',
      ToolId: undefined,
      Annotation: 'foo',
      Configuration: {},
      Secrets: {},
      Meta: [],
      srcData: {}
    });
    expect(typeof contextValue[1]).toBe('function');
  });

  it('should call JsEvent with updated model when GetConfiguration is called', async () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');

    const expectedPayload = {
      Configuration: {
        Configuration: {
          Secrets: {}
        },
        Annotation: 'foo'
      }
    };

    render(
      <DesignerApi ctx={window.Alteryx} messages={{}}>
        <FooChild />
      </DesignerApi>
    );

    await act(async () => {
      await window.Alteryx.Gui.GetConfiguration();
    });

    expect(spyJsEvent).toHaveBeenCalledWith('GetConfiguration', expectedPayload, window.Alteryx);
  });

  it('should update secrets and encryptionMode in context', () => {
    const Child = () => {
      const context = React.useContext(UiSdkContext);
      if (!context) return null;

      const [model, handleUpdateModel] = context;
      if (!model.Secrets.password1?.text) {
        handleUpdateModel({
          ...model,
          Secrets: {
            ...model.Secrets,
            password1: { text: 'secret', encryptionMode: 'machine' }
          }
        });
      }
      return (
        <>
          <div data-testid="text">{model.Secrets.password1.text}</div>
          <div data-testid="mode">{model.Secrets.password1.encryptionMode}</div>
        </>
      );
    };

    render(
      <DesignerApi
        ctx={window.Alteryx}
        defaultConfig={{ Secrets: { password1: { text: null, encryptionMode: 'obfuscation' } } }}
        messages={{}}
      >
        <Child />
      </DesignerApi>
    );

    expect(screen.getByTestId('text')).toHaveTextContent('secret');
    expect(screen.getByTestId('mode')).toHaveTextContent('machine');
  });

  it('should handle updates to multiple secret keys correctly', () => {
    const Child = () => {
      const context = React.useContext(UiSdkContext);
      if (!context) return null;

      const [model, handleUpdateModel] = context;
      if (!model.Secrets.password2?.text) {
        handleUpdateModel({
          ...model,
          Secrets: {
            ...model.Secrets,
            password2: { text: 'secret3', encryptionMode: 'user' },
            password1: { text: 'secret2', encryptionMode: 'machine' }
          }
        });
      }

      return (
        <>
          <div data-testid="p2-text">{model.Secrets.password2.text}</div>
          <div data-testid="p2-mode">{model.Secrets.password2.encryptionMode}</div>
          <div data-testid="p1-text">{model.Secrets.password1.text}</div>
          <div data-testid="p1-mode">{model.Secrets.password1.encryptionMode}</div>
        </>
      );
    };

    render(
      <DesignerApi
        ctx={window.Alteryx}
        defaultConfig={{
          Secrets: {
            password1: { text: null, encryptionMode: 'obfuscation' },
            password2: { text: null, encryptionMode: 'obfuscation' }
          }
        }}
        messages={{}}
      >
        <Child />
      </DesignerApi>
    );

    expect(screen.getByTestId('p2-text')).toHaveTextContent('secret3');
    expect(screen.getByTestId('p2-mode')).toHaveTextContent('user');
    expect(screen.getByTestId('p1-text')).toHaveTextContent('secret2');
    expect(screen.getByTestId('p1-mode')).toHaveTextContent('machine');
  });
});
