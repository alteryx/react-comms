The most common utility function you may need to utilize is the `jsEvent` function that can imported from the React Comms library. This is a function that handles communciation with the C# side of Designer from the configuration panel and your tool UI. For a full list of supported jsEvents, check out window.Alteryx.SupportedJsEvents in the HTML Developer Tools in Designer.

### FileBrowse

In Designer, it's highly likely that you'll run into a situation where you'd like to load a file from your local file system. Because there are limitations to what you can do with this via browser based JavaScript, the JsEvent allows you to interface more directly with the file system. An example input for interfacing with the file system using this JsEvent might look something like the following:

```jsx static
const folderButton = () => {
  const [model, handleUpdateModel] = useContext(UiSdkContext);
  
  const onButtonClick = async () => {
    const newModel = { ...model };
    const val = await JsEvent(window.Alteryx, 'FileBrowse', {});
    newModel.Configuration.fileNames = val;
    handleUpdateModel(newModel);
  };
  
  return (
    <Grid alignItems="flex-end" container spacing={2}>
      <Grid item>
        <Button color="primary" onClick={onButtonClick} variant="contained">
          <Folder />
        </Button>
      </Grid>
    </Grid>
  )
}
```