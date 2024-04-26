#/usr/bin/env bash

# Bash completion for nx.dev project 
# Inspired by https://github.com/jukben/fish-nx/blob/master/completions/nx.fish

# Prerequisites:
# brew install jq fzf

# Installation
# Source this file in your .bash_profile:
# source nx-completion.bash

COMMANDS="run generate affected run-many affected:apps affected:libs affected:build affected:test affected:e2e affected:dep-graph print-affected affected:lint dep-graph format:check format:write workspace-lint workspace-schematic migrate report list"

# TODO: lookup workspace.json recursively
_nx_generate_projects()
{
  echo "$(jq -r '.projects | to_entries | map("\(.key as $project | .value.architect | keys | map("\($project):\(.)") | .[])") | .[]' workspace.json | fzf)"
}

_nx_generate_schematics()
{
  echo "$(nx workspace-schematic --list-schematics | fzf)"
}

_nx_autocomplete()
{
  case "${COMP_WORDS[1]}" in
    run)
      COMPREPLY=($(_nx_generate_projects))
      ;;
    workspace-schematic)
      COMPREPLY=($(_nx_generate_schematics))
      ;;
    *)
      COMPREPLY=($(compgen -W "$COMMANDS" "${COMP_WORDS[1]}"))
      ;;
  esac
}

complete -F _nx_autocomplete nx