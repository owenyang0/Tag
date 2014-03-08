@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\app.js" %*
) ELSE (
  node  "%~dp0\app.js" %*
)