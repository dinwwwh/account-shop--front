<template>
  <section class="bg-gray-50 space-y-6">
    <div>
      <ul class="space-y-8">
        <li>
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div>
              <div class="text-sm">
                <a href="#" class="text-gray-900 font-medium"
                  >Leslie Alexander</a
                >
              </div>
              <div class="mt-1 text-gray-700 text-sm">
                <p>
                  Ducimus quas delectus ad maxime totam doloribus reiciendis ex.
                  Tempore dolorem maiores. Similique voluptatibus tempore non
                  ut.
                </p>
              </div>
              <div class="mt-2 text-sm space-x-2">
                <span class="text-gray-500 font-medium">4d ago</span>
                <!-- space -->
                <span class="text-gray-500 font-medium">·</span>
                <!-- space -->
                <button type="button" class="text-gray-900 font-medium">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div>
              <div class="text-sm">
                <a href="#" class="text-gray-900 font-medium">Michael Foster</a>
              </div>
              <div class="mt-1 text-gray-700 text-sm">
                <p>
                  Et ut autem. Voluptatem eum dolores sint necessitatibus quos.
                  Quis eum qui dolorem accusantium voluptas voluptatem ipsum.
                  Quo facere iusto quia accusamus veniam id explicabo et aut.
                </p>
              </div>
              <div class="mt-2 text-sm space-x-2">
                <span class="text-gray-500 font-medium">4d ago</span>
                <!-- space -->
                <span class="text-gray-500 text-xs font-medium">·</span>
                <!-- space -->
                <button type="button" class="text-gray-900 font-medium">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div>
              <div class="text-sm">
                <a href="#" class="text-gray-900 font-medium">Dries Vincent</a>
              </div>
              <div class="mt-1 text-gray-700 text-sm">
                <p>
                  Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab
                  sint et voluptatem repudiandae voluptatem et eveniet. Nihil
                  quas consequatur autem. Perferendis rerum et.
                </p>
              </div>
              <div class="mt-2 text-sm space-x-2">
                <span class="text-gray-500 font-medium">4d ago</span>
                <!-- space -->
                <span class="text-gray-500 font-medium">·</span>
                <!-- space -->
                <button type="button " class="text-gray-900 font-medium">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bg-gray-50">
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
        </div>
        <div class="flex-1 min-w-0">
          <form action="#">
            <div>
              <label for="comment" class="sr-only">About</label>
              <textarea
                id="comment"
                name="comment"
                rows="3"
                class="
                  block
                  w-full
                  border
                  focus:border-blue-500
                  border-gray-300
                  rounded-md
                  shadow-sm
                  focus:ring-blue-500
                  sm:text-sm
                "
                placeholder="Add a note"
              ></textarea>
            </div>
            <div class="flex items-center justify-between mt-3">
              <a
                href="#"
                class="
                  group
                  inline-flex
                  items-start
                  text-gray-500
                  hover:text-gray-900
                  text-sm
                  space-x-2
                "
              >
                <svg
                  class="
                    flex-shrink-0
                    w-5
                    h-5
                    text-gray-400
                    group-hover:text-gray-500
                  "
                  x-description="Heroicon name: solid/question-mark-circle"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span> Some HTML is okay. </span>
              </a>
              <button
                type="submit"
                class="
                  inline-flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  text-white text-sm
                  font-medium
                  bg-blue-600
                  hover:bg-blue-700
                  border border-transparent
                  rounded-md
                  focus:outline-none
                  shadow-sm
                  focus:ring-blue-500 focus:ring-offset-2 focus:ring-2
                "
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>
