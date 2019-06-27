# Drupal 8 Default Content Doctor

The _Drupal 8 Default Content Doctor_ or "DCD" for short is a lightweight command line tool for debugging exported json configurations from the [Default Content Module](https://www.drupal.org/project/default_content).

This tool is intended for people (mistakenly) using the Default Content module as a collaborative, vcs-friendly development tool. As you may have already realized, using it this way results in constant conflicts, install errors and general messiness. DCD gives you insights about your exported content, such as missing or repeated IDs, to aid as a debugging tool.

## Installation

```
npm install -g d8-dcd
```

## Usage

```
# Display a list of problems identified in exports
dcd --diagnose --folder="mysite/.../content"
```