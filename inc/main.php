<?php $main_tag = (bool) $data->current_character ? 'div' : 'main'; ?>
<<?= $main_tag ?> id="swup" class="transition-main">
  <!--<p>This number should not change if swapping one or more fragments: <strong><?= uniqid(); ?></strong></p>-->
  <div data-swup-fragment-container="list">
    <nav class="filters">
      <ul class="filters_list">
        <?php foreach($data->filters as $filter): ?>
        <li class="filters_item">
          <a 
            data-swup-to-fragment="list"
            data-modal-close-url="./?filter=<?= $filter->slug ?>"
            class="filters_link <?= $filter->is_active ? 'is-active' : '' ?>" 
            href="<?= $filter->is_active ? './' : "./?filter=$filter->slug" ?>">
            <?= $filter->name ?>
          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    </nav>
    <section class="teasers">
      <ul class="teasers_list">
        <?php foreach($data->characters as $character): ?>
        <?php if( !$character->matches_filter ) continue; ?>
        <li class="teasers_item">
          <a 
            data-swup-to-fragment="modal"
            class="teasers_link <?= $character->is_active ? 'is-active' : '' ?>" 
            href="./?character=<?= $character->slug ?>">
            <div class="teasers_batch" style="background-color: <?= $character->color ?>">
              <div class="teasers_image" style="background-image: url(./data/images/<?= $character->image ?>);"></div>
            </div>
            <?= $character->name ?>
          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    </section>
  </div>

  <?php if($current = $data->current_character): ?>
  <main class="modal" data-swup-fragment-container="modal">
    <div class="modal_inner">
      <a href="./" class="modal_backdrop" data-apply-modal-close-url data-swup-to-fragment="modal"></a>
      <div class="modal_content character">
        <div class="character_header" style="background-color: <?= $current->color ?>;">
          <a href="./" class="character_close" data-apply-modal-close-url data-swup-to-fragment="modal">&#x2715</a>
          <div class="character_image" style="background-image: url(./data/images/<?= $current->image ?>);"></div>
        </div>
        <div class="character_body text">
          <h1><?= $current->name ?></h1>
          <p><strong><?= $current->name ?></strong> is one of the characters of Super Mario.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde possimus vero aliquam inventore molestiae cumque quibusdam impedit dolor quo dolores eum minus sint.</p>
          <p><a href="./about.php">About</a></p>
        </div>
        <nav>
          <ul class="character_nav">
            <li class="character_nav_item">
              <a 
                data-swup-to-fragment="modal"
                class="character_nav_link --previous" 
                href="./?character=<?= $current->previous->slug ?>">
                ← <?= $current->previous->name ?></a></li>
            <li class="character_nav_item">
              <a 
                data-swup-to-fragment="modal"
                class="character_nav_link --next" 
                href="./?character=<?= $current->next->slug ?>">
                <?= $current->next->name ?> →</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
  <?php else: ?>
  <div data-swup-fragment-container="modal"></div>
  <?php endif; ?>

</<?= $main_tag ?>>

