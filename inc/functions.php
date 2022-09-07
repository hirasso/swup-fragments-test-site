<?php 

function pre_dump( $what, $die = false ) {
  echo "<pre class='dump'>";
  var_dump( $what );
  echo "</pre>";
  if( $die ) {
    exit;
  }
}

function to_object( $value ) {
  return json_decode( json_encode( $value ) );
}

function get_data(string $file, array $options): object {
  $data = json_decode(file_get_contents($file));
  $data->document_title = 'Super Mario Characters';
  
  $data->filters = array_map(function($filter) use($options, $data) {
    $filter->is_active = $filter->slug === $options['current_filter'];
    if($filter->is_active) {
      $data->current_filter = $filter;
      $data->document_title = "Filter: $filter->name";
    }
    return $filter;
  }, $data->filters);

  foreach( $data->characters as $id => &$character ) {
    $character->is_active = $character->slug === $options['current_character'];
    if($character->is_active) {
      $data->current_character = $character;
      $data->document_title = "Character: $character->name";
    }
    $character->previous = $data->characters[$id-1] ?? $data->characters[count($data->characters)-1];
    $character->next = $data->characters[$id+1] ?? $data->characters[0];
    $character->matches_filter = empty($options['current_filter']) || in_array($options['current_filter'], $character->filters);
    unset($character);
  }

  return $data;
}